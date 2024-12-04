// 비밀번호, 닉네임 유효성 검사 함수
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{7,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error('비밀번호는 7자 이상, 특수 문자를 포함해야 합니다.');
  }
};

export const validateNickname = (nickname) => {
  if (nickname.trim().length < 2) {
    throw new Error('닉네임은 최소 2글자 이상이어야 합니다.');
  }
};
