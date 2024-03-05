# 📒 작성자는 이 안에 있어!

<b>오늘의 기분에 맞춰 일기를 작성할 수 있는 다이어리 프로젝트</b>

<br />

## 🗓️ 프로젝트 기간

2024.02.11 ~ 2024.2.29

<br />

## 🤔 기획 의도

다이어리 본연의 기능에 초점을 맞춘 애플리케이션을 기획<br>
유저들간의 소통 기능을 최소화하고, 본인의 일기에 집중하게끔 제작

<br/>

## 👥 팀원 소개

> 🕵️ **내이름은 탐정, 코난2조** 🕵️

| 이름                                       | 역할 | 역할 내용                                                                                                   |
| ------------------------------------------ | ---- | ----------------------------------------------------------------------------------------------------------- |
| [김서본(팀장)](https://github.com/seobon/) | FULL | 다이어리 전반                                                                                               |
| [이경도](https://github.com/leekyoungdo)   | BE   | 유저 생성 전반, 배포                                                                                        |
| [이은실](https://github.com/HeySiriLee)    | FULL | 날씨 및 현재 위치 CRUD 구현                                                                                 |
| [윤병우](https://github.com/yoonbung12)    | BE   | 유저 조회 전반, 배포                                                                                        |
| [이동욱](https://github.com/ldw0123)       | FE   | 메인 공통 컴포넌트 (Navbar, Footer, Carousel), <br /> 다이어리 전반(캘린더, 작성하기), 투두리스트 구현      |
| [이세윤](https://github.com/ErrorMonkey)   | FE   | 다이어리 리스트, 검색 구현                                                                                  |
| [한기선](https://github.com/kihet77)       | FE   | 메인 공통 반응형 컴포넌트 (Navbar, Header, Popup), <br /> 유저 관련 전반(로그인/회원가입/유저정보찾기) 구현 |

<br/>

## 📌 주요 기능

1. 다이어리

- 오늘 날짜로만 다이어리를 작성할 수 있습니다. <br />
- 공개/비공개 글을 선택하여 작성할 수 있습니다.<br />
- 작성자가 선택한 오늘의 기분을 캘린더에서 한 눈에 볼 수 있습니다. <br />
- 작성일자를 기준으로 날씨와 기온을 자동으로 작성해줍니다. <br />
- 작성한 다이어리의 내용은 언제든지 수정하거나 삭제 할 수 있습니다.
- 다른사람이 작성한 공개글은 다이어리 리스트에서 한 눈에 확인할 수 있고, SNS 기능을 최소화하기 위해 댓글 기능 없이 글 열람만 가능합니다.
  <br />

2. 투두리스트

- 내가 할 일을 기록할 수 있습니다. <br />
- 할 일이 끝나면 체크하거나 삭제, 수정을 할 수 있습니다. <br />

3. 회원

- 회원의 다이어리와 투두리스트는 DB에 저장되어 어느 환경에서 로그인을 하여도 확인할 수 있습니다. <br />
  <br />

## 🛠️ 기술 스택

<div align=center> 
  
### Front-end

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white"/>
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white" /> 
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white" /> 
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
<br />

### Back-end

<img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=Conda-Forge&logoColor=white" />
<img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" /> 
<img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"/>
<br />

### Tools

<img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white">
<img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white" />
<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" />
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
<img src="https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white">

</div>

<br />

## 📌 화면 구성

<b>펼쳐보기<b/>
<details>
<summary>
</summary>

<div align=center >

| 회원/비회원 서비스 |
| :----------------: |
| ![캘린더 투두](https://github.com/seobon/TeamTwoFront/assets/88626857/ff2b1b87-a066-4392-8b7a-5f7a0fc27267)
| 메인 홈 페이지 |
![검색기능](https://github.com/seobon/TeamTwoFront/assets/88626857/ca1d9fbc-2b4b-41d4-b029-78f8f3f4c293)
| 검색 기능 |
![다이어리 리스트](https://github.com/seobon/TeamTwoFront/assets/88626857/45f143b3-45b5-4de2-8f8f-55314952cfce)
| 다이어리 리스트 |
![일기1](https://github.com/seobon/TeamTwoFront/assets/88626857/0cf550fc-fb7a-4aa8-87f6-327f216de142)
| 일기 (게시글) |
![작성하기2](https://github.com/seobon/TeamTwoFront/assets/88626857/0ffb47f8-a74f-4eb6-825f-660214f94e82)
| 작성하기 |
![수정하기](https://github.com/seobon/TeamTwoFront/assets/88626857/ed1f6499-a8a6-436c-82cf-a1b483601173)
| 수정하기 |
![아이디찾기_메일본문](https://github.com/seobon/TeamTwoFront/assets/88626857/312fcad7-0892-4a81-937d-c02a34299f27)
| 아이디 찾기 (메일 서비스) |
![비밀번호 찾기](https://github.com/seobon/TeamTwoFront/assets/88626857/985170cd-3356-4aa5-90b0-6cebbb423753)
| 비밀번호 찾기 (메일 서비스) |

</div>
</details>

<br /><br />

## 📌 프로젝트 구성

<div align=center>

</div>

<div align=center>

|                                  **팀 노션**                                   |
| :----------------------------------------------------------------------------: |
| [작안\_Notion](https://www.notion.so/2-497aee7da76c44349b490e628b98f318?pvs=4) |

|                  **FrontEnd Github**                  |
| :---------------------------------------------------: |
| [TeamTwoFront](https://github.com/seobon/TeamTwoFront) |

|                  **BackEnd Github**                  |
| :--------------------------------------------------: |
| [TeamTwoBack](https://github.com/seobon/TeamTwoBack) |

</div>
<br />
<div align=center> 
  
| **개체-관계 모델(ERD)** |
| :----------: |
| <img src='https://github.com/seobon/TeamTwoFront/blob/develop/src/assets/GIT/ERD.jpg' width="800" /> |

</div>
