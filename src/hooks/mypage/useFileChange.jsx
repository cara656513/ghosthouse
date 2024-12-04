import React, { useEffect, useState } from 'react';
import supabase from '../../utils/supabaseClient';
import { toast } from 'react-toastify';

export const useFileChange = (userData) => {
  const [profileImg, setProfileImg] = useState(null); // 프로필 이미지 상태
  const [selectedFile, setSelectedFile] = useState(null); // 업로드 파일 상태

  // 로그인 , 새로고침시 supabase에 있는 유저의 프로필을 가져옴
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (userData?.id) {
        try {
          const { data, error } = await supabase.from('users').select('profile_img').eq('id', userData.id).single();

          if (error) throw error;

          setProfileImg(data.profile_img);
        } catch (err) {
          console.error('프로필 이미지를 불러오지 못했습니다.', err.message);
        }
      }
    };
    fetchProfileImage();
  }, [userData]);

  //파일 선택 핸들러
  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // 파일 선택
    if (file) {
      setSelectedFile(file); // 선택된 파일 상태로 저장

      // 이미지 미리보기 URL 생성 (로컬)
      const previewUrl = URL.createObjectURL(file);
      setProfileImg(previewUrl); // 미리보기 이미지로 설정
      console.log('미리보기 URL:', previewUrl); // 디버그용 로그
    }
  };

  // 이미지 업로드 함수
  const uploadImage = async (file) => {
    const fileName = `${userData.id}-${Date.now()}.png`; // 고유 파일 이름 생성
    const filePath = `Profile_img/${fileName}`; // 업로드 경로

    try {
      // 파일 업로드
      const { data, error } = await supabase.storage.from('Image').upload(filePath, file);

      if (error) {
        console.error('파일 업로드 실패:', error.message);
        throw error;
      }

      // 업로드된 파일 경로 확인
      console.log('업로드된 경로:', data.path);

      // Public URL 가져오기
      const { data: publicData, error: publicError } = supabase.storage.from('Image').getPublicUrl(data.path);

      if (publicError) {
        console.error('Public URL 가져오기 실패:', publicError.message);
        throw publicError;
      }

      console.log('업로드된 이미지 URL:', publicData.publicUrl);
      return publicData.publicUrl;
    } catch (err) {
      console.error('이미지 업로드 중 오류 발생:', err.message);
      return null;
    }
  };

  // 프로필 업로드 및 업데이트 함수
  const uploadAndSaveProfile = async () => {
    if (!selectedFile) {
      toast.warning('파일을 선택해주세요.');
      return;
    }

    if (!userData?.id) {
      console.error('사용자 데이터가 초기화되지 않았습니다.');
      return;
    }

    // 이미지 업로드
    const imageUrl = await uploadImage(selectedFile);
    if (!imageUrl) {
      toast.warning('이미지 업로드에 실패했습니다.');
      return;
    }

    console.log('최종 업로드된 이미지 URL:', imageUrl); // 디버깅용 로그

    try {
      // 사용자 데이터베이스에 프로필 URL 업데이트
      const { error } = await supabase.from('users').update({ profile_img: imageUrl }).eq('id', userData.id);

      if (error) throw error;

      toast.warning('프로필 이미지가 성공적으로 업데이트되었습니다!');
      setProfileImg(imageUrl); // UI에서 새 이미지로 업데이트
    } catch (err) {
      console.error('프로필 업데이트 실패:', err.message);
    }
  };

  return { handleFileChange, uploadAndSaveProfile, profileImg };
};
