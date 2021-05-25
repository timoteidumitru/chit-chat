import styled from "styled-components";

export const StyledMessage = styled.div`
  display: flex;
  /* justify-content: space-between; */
  width: 100%;
  padding: 15px;
  & img {
    border-radius: 50%;
    width: 70px;
    height: 70px;
    margin-right: 20px;
  }
`;

export const DataMessage = styled.div`
  width: 100%;
  & span {
    float: right;
    font-size: 13px;
    padding-top: 10px;
  }
`;
export const MessageName = styled.div`
  text-align: left;
  margin-left: 10px;
`;

export const MessageText = styled.div`
  text-align: left;
  margin-top: 10px;
  margin-left: 10px;
  background: #3f51b5;
  border: 2px solid #3f51b5;
  border-radius: 10px;
  padding: 4px;
  padding-left: 5px;
  color: white;
  line-break: anywhere;
`;
