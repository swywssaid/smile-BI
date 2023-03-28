import React, { useState } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import Button from '../components/common/Button';
import Form from '../components/common/Form';
import Modal from '../components/common/Modal';

export default function IssuancePage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  // 시작버튼 클릭 시 서버에 유저 정보 전달
  const submitUserInfo = async (url, data) => {
    const { name, phone } = data;

    await axios
      .post(url, { name, phone })
      .then((res) => {
        setCouponCode(res.data.data);
        setWarningMessage('');
        setIsVisibleModal(true);
      })
      .catch((err) => {
        // 에러 처리
        if (err.response) {
          // 요청이 이루어졌고 서버가 응답했을 경우

          const { status } = err.response;

          if (status === 400) {
            setCouponCode('');
            setWarningMessage('이미 발급 받은 회원 정보입니다');
          }

          if (status === 500) setWarningMessage('잠시후 다시 이용해주세요');
        } else {
          // 그 외 (요청이 이루어졌으나 서버에서 응답이 없었을 경우 포함)
          setWarningMessage('잠시후 다시 이용해주세요');
        }
      });
  };

  // 유효성 체크
  const checkValid = (regex, setValue) => (event) => {
    const input = event.target.value;

    if (regex.test(input)) {
      setValue(input);
      setWarningMessage('');
    }

    if (input === '') {
      setValue('');
      setWarningMessage('');
    }
  };

  const handleModalClosed = () => {
    setIsVisibleModal(false);
    setName('');
    setPhone('');
  };

  const nameRegex = /^[a-zㄱ-ㅎ가-힣]{1,}$/;
  const phoneRegex = /^[0-9]{1,}$/;

  const nameProps = {
    type: 'text',
    value: name,
    handleChange: checkValid(nameRegex, setName),
    placeholder: '이름을 입력하세요!',
  };

  const phoneProps = {
    type: 'text',
    value: phone,
    handleChange: checkValid(phoneRegex, setPhone),
    placeholder: '휴대폰 번호를 입력하세요!',
  };

  // 유효성 검사에 따른 버튼 활성화
  const activateButton = (name, phone) => {
    const nameRegex = /[a-z가-힣]{2,10}/;
    const phoneRegex = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

    return !(nameRegex.test(name) && phoneRegex.test(phone));
  };

  return (
    <IssuancePageWrapper>
      <HeaderWrapper>
        <Title>쿠폰 발급 페이지</Title>
        <Description>이름과 휴대폰 번호로 쿠폰을 발급 받을 수 있습니다</Description>
      </HeaderWrapper>
      <FormWrapper>
        <Form {...nameProps} />
        <Form {...phoneProps} />
        <Button
          text='발급받기'
          handleClick={() => submitUserInfo('/api/coupon/issuance', { name, phone })}
          disabled={activateButton(name, phone)}
        />
        <WarningMessageWrapper>{warningMessage}</WarningMessageWrapper>
        {isVisibleModal && (
          <Modal mainText={'쿠폰이 발급되었습니다'} subText={couponCode}>
            <Button type='modal' text='종료하기' handleClick={handleModalClosed} />
          </Modal>
        )}
      </FormWrapper>
    </IssuancePageWrapper>
  );
}

const IssuancePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin: 0;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  padding: 100px;
`;

const Title = styled.h2`
  font-family: 'Pretendard-Regular';
  font-size: 30px;
`;

const Description = styled.div`
  font-family: 'Pretendard-Light';
  font-size: 18px;
  padding-top: 35px;
`;

const FormWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-left: 100px;
  flex-direction: column;
`;

const WarningMessageWrapper = styled.div`
  padding-top: 15px;
  font-family: 'Pretendard-Light';
  color: red;
`;
