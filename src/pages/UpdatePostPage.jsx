import { Container, Form, Input, Label, WholeContainer } from '../components/newpost/NewPostStyles';

const UpdatePostPage = () => {
  return (
    <WholeContainer>
      <Container>
        <Form>
          <div
            style={{
              display: 'flex'
            }}
          >
            <Label></Label>
            <div
              style={{
                display: 'grid'
              }}
            >
              <button
                type="button"
                style={{
                  width: '440px'
                }}
              >
                현위치 수정하기
              </button>
              <input type="text" id="title" placeholder="수정할 제목을 입력하세요" required></input>
              <Input type="text" id="text" placeholder="수정할 내용을 입력하세요" />
            </div>
          </div>
          <div>
            <button type="submit">수정</button>
            <button type="button">취소</button>
          </div>
        </Form>
      </Container>
    </WholeContainer>
  );
};

export default UpdatePostPage;
