import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Button from '../components/common/Button';
import Form from '../components/common/Form';
import Pagination from '../components/HistoryPage/Pagination';

export default function HistoryPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [histories, setHistories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = process.env.REACT_APP_PAGE_SIZE;

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(
        `/api/coupon/history?page=${currentPage}&pageSize=${pageSize}&name=${name}&phone=${phone}`,
      );

      console.log(request.data.data, request.data.length);
      setHistories(request.data.data);
      setTotalPages(Math.ceil(request.data.length / pageSize));
    };

    fetchData();
  }, [pageSize, currentPage, name, phone]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const nameProps = {
    type: 'text',
    value: name,
    handleChange: handleChangeName,
    placeholder: '이름을 입력하세요!',
  };

  const phoneProps = {
    type: 'text',
    value: phone,
    handleChange: handleChangePhone,
    placeholder: '휴대폰 번호를 입력하세요!',
  };

  return (
    <div>
      <Form {...nameProps} />
      <Form {...phoneProps} />
      <h1>Coupon Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Coupon Code</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {histories.map((history) => (
            <tr key={history.id}>
              <td>{history.name}</td>
              <td>{history.phone_number}</td>
              <td>{history.coupon_code}</td>
              <td>{history.created_at.split('T')[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}
