import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const pageGroupSize = +process.env.REACT_APP_PAGE_GROUP_SIZE;

// 페이지네이션 기능을 구현하는 컴포넌트입니다.
export default function Pagination({ totalPages, currentPage, setCurrentPage }) {
  const [count, setCount] = useState(0);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(Math.min(pageGroupSize, totalPages));

  // 페이지 그룹의 시작 페이지와 끝 페이지를 계산합니다.
  useEffect(() => {
    setStartPage(pageGroupSize * count + 1);
    setEndPage(Math.min(pageGroupSize * (count + 1), totalPages));
  }, [count, totalPages]);

  // 이전, 다음 버튼 클릭 시 현재 페이지 이동
  useEffect(() => {
    setCurrentPage(startPage);
  }, [startPage, setCurrentPage]);

  const handlePrevClick = () => {
    setCount(count - 1);
  };

  const handleNextClick = () => {
    setCount(count + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageButtons = () => {
    const buttons = [];

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PageButton key={i} onClick={() => handlePageClick(i)} active={i === currentPage}>
          {i}
        </PageButton>,
      );
    }
    return buttons;
  };

  return (
    <PaginationWrapper>
      <PrevNextButton onClick={handlePrevClick} disabled={currentPage >= 1 && currentPage <= 5}>
        이전
      </PrevNextButton>
      {renderPageButtons()}
      <PrevNextButton
        onClick={handleNextClick}
        disabled={
          currentPage >= Math.floor(totalPages / pageGroupSize) * pageGroupSize + 1 && currentPage <= totalPages
        }
      >
        다음
      </PrevNextButton>
    </PaginationWrapper>
  );
}

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  font-size: 14px;
  padding: 8px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  background-color: 'white';
  color: ${(props) => (props.active ? '#ff8d3f' : 'black')};
  cursor: pointer;
`;

const PrevNextButton = styled.button`
  font-size: 14px;
  padding: 8px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  background-color: #ff8d3f;
  color: white;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
`;
