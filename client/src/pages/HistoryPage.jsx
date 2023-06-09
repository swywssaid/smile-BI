import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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

  // useDebounce를 통한 검색 최적화
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
    page: 'HistoryPage',
  };

  const phoneProps = {
    type: 'text',
    value: phone,
    handleChange: handleChangePhone,
    placeholder: '휴대폰 번호를 입력하세요!',
    page: 'HistoryPage',
  };

  return (
    <HistoryPageWrapper>
      <HeaderWrapper>
        <Title>이력 조회 페이지</Title>
        <Description>원하는 정보를 검색할 수 있습니다</Description>
      </HeaderWrapper>
      <FormWrapper>
        <Form {...nameProps} />
        <Form {...phoneProps} />
      </FormWrapper>
      <Table>
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
      </Table>
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </HistoryPageWrapper>
  );
}

const HistoryPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin: 0;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

const Title = styled.h2`
  font-family: 'Pretendard-Regular';
  font-size: 30px;
`;

const Description = styled.div`
  font-family: 'Pretendard-Light';
  font-size: 18px;
  padding-top: 20px;
`;

const FormWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-left: 20px;
  flex-direction: row;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ccc;
    padding: 12px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
    font-size: 18px;
  }

  td {
    font-size: 16px;
  }
`;
