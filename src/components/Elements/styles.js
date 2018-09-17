import styled from 'styled-components';
const Wrapper = styled.div`
    background-color: #eee;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
        font-family: 'Gill Sans';
    background-color: white;
    h1, h2, h3, h4, h5, th {
        font-family: Rockwell, "Courier Bold", "Courier", "Georgia", Times, "Times New Roman", serif !important;
    }
`;
const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 50px;
`;
const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    th{
        text-align: left;
        background-color: white !important;
    }
    tr:nth-child(3n + 1) {
    background-color: #fde9ce;
    }
  
  tr:nth-child(3n) {
    background-color: #fdf5ce;
  }
  
  tr: nth-child(3n + 2) {
    background-color: #dcefea;
  }
  td, th{
      padding: 1rem !important;
  }

`
const MatchHeader = styled.h2`
    cursor: pointer;
    padding: 18px;
    &:nth-child(3n + 1) {
        background-color: ${({on}) => on ? '#f49712' : "#eee"};
      }
      &:nth-child(3n) {
        background-color: ${({on}) => on ? '#f7d117' : "#eee"};
      }
      &:nth-child(3n + 2) {
        background-color: ${({on}) => on ? '#a6d6c9' : "#eee"};
      }
      &:nth-child(3n + 1):hover {
        background-color: #fde9ce;
        }
      
      &:nth-child(3n):hover {
        background-color: #fdf5ce;
      }
      
      &:nth-child(3n + 2):hover {
        background-color: #dcefea;
      }
`;
const Reveal = styled.div`
    overflow: auto;
`
const MatchGroup = styled.div`

`

export {
    Container,
    Wrapper,
    Table,
    MatchHeader,
    MatchGroup,
    Reveal
};