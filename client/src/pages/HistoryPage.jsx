import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Form from '../components/common/Form';
import Pagination from '../components/HistoryPage/Pagination';
import { useDebounce } from '../hooks/useDebounce';

export default function HistoryPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [histories, setHistories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = process.env.REACT_APP_PAGE_SIZE;
  const debouncedSearchNameTerm = useDebounce(name, 400);
  const debouncedSearchPhoneTerm = useDebounce(phone, 400);

  useEffect(() => {
    fetchData(currentPage, pageSize, debouncedSearchNameTerm, debouncedSearchPhoneTerm);
  }, [currentPage, pageSize, debouncedSearchNameTerm, debouncedSearchPhoneTerm]);

  const fetchData = async (currentPage, pageSize, debouncedSearchNameTerm, debouncedSearchPhoneTerm) => {
    const request = await axios.get(
      `/api/coupon/history?page=${currentPage}&pageSize=${pageSize}&name=${debouncedSearchNameTerm}&phone=${debouncedSearchPhoneTerm}`,
    );

    setHistories(request.data.data);
    setTotalPages(Math.ceil(request.data.length / pageSize));
  };

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
      <h1>이력 조회 페이지</h1>
      <div>원하는 정보를 검색할 수 있습니다</div>
      <Form {...nameProps} />
      <Form {...phoneProps} />
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
