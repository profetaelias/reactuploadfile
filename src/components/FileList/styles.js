import styled from 'styled-components';

export const Container = styled.ul`
  margin-top: 20px;
  
  li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;

    & + li{
        margin-top: 15px;
    }

  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;

  div {
      display: flex;
      flex-direction: column;

      span{
          font-size: 12px;
          color: #999;
          margin-top: 5px;

          button: {
              border: 0;
              background: transparent;
              color: #e57878;
              margin-left: 5px;
              cursor: pointer;
          }
      }
   }
`;

export const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export const Preview = styled.div`
   width: 36px;
   height: 36px;
   border-radius: 5px;
   background-image: url(${props => props.src});
   background-repeat: no-repeat;
   background-size: cover;
   background-position: 50% 50%;
   margin-right: 10px;
`;