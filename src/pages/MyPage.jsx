import React, { useState, useEffect } from 'react';
import supabase from '../utils/supabaseClient';
import styled from 'styled-components';

const ContentsPage = () => {
  const [contents, setContents] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const OpenModalBtn = styled.button`
    height: 100px;
  `;

  const fetchContents = async () => {
    const { data, error } = await supabase
      .from('posts') // 테이블 이름
      .select('id, content'); // 올바른 컬럼 이름으로 수정 ('content')

    if (error) {
      setError(error.message);
      console.error('Error fetching contents:', error);
    } else {
      setContents(data);
      console.log('Fetched contents:', data); // 반환된 데이터 확인
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>마이 페이지</h1>
      <OpenModalBtn onClick={openModal}>프로필 수정</OpenModalBtn>
      {isModalOpen && (
        <div onClick={closeModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <h2>Modal Content</h2>
            <p>This is a modal</p>
            <button onClick={closeModal}>Close Modal</button>
          </div>
        </div>
      )}
      <ul>
        {contents.map((item) => (
          <li key={item.id}>{item.content}</li> // content 값 출력
        ))}
        <button>수정</button>
        <button>삭제</button>
      </ul>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ContentsPage;
