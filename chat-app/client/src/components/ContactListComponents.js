import React, { useState } from "react";
import styled from "styled-components";
import httpManager from "../managers/httpManager";
import { contactList } from "../mockData";
import utility from "../utility";
 
 const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.6;
  height: 100%;
  width: 100%;
  border-right: 1px solid #dadada;
  background: white;
`;
const ProfileInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  background: #ededed;
  padding: 10px;
`;
const ProfileImage = styled.img`
width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-left: 12px;
  object-fit: cover;
`;

  const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  background: #f6f6f6;
  padding: 10px;
`;
export const SearchContainer = styled.div`
display: flex;
flex-direction: row;
background: white;
border-radius: 16px;
width: 100%;
padding: 5px 10px;
gap: 10px;
`;
const SearchIcon = styled.img`
width: 28px;
height: 28px;
`;
export const SearchInput = styled.input`
width: 100%;
outline: none;
border: none;
font-size: 15px;
margin-left:1px;
`;

const ContactItem =styled.div`
 display: flex;
 flex-direction:row;
 border-bottom:1px solid #f2f2f2;
 background: white;
 cursor:pointer;
 padding:2px 10px;
 :hover {
    background: #ebebeb;
  }
  `;
  const ProfileIcon = styled(ProfileImage)`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-left: 12px;
  margin-top: 15px;
  margin-bottom: 15px;
  object-fit: cover;
`;
const ContactInfo = styled.div`
display:flex;
flex-direction:column;
width: 100%;
margin:10px 12px;
 
`;
const ContactName=styled.span`
width:100%;
font-size:16px;
color: black;

`;
const MessageText=styled.span`
width:100%;
font-size:14px;
color: rgba(0,0,0,0,0);
margin-top:3px;
`;
const MessageTime=styled.span`
font-size:12px;
color: rgba(0,0,0,0,0.45);
margin-right:10px;
margin-top:11px;
white-space:nowrap;
`;
const SearchResults = styled.div`
  width: 100%;
  height: 100px;
`;
const ContactComponent =(props) => {
  const {userData, setChat} = props;
   const [searchResult, setSearchResult] = useState();


  return <ContactItem onClick={()=>setChat(userData)}>
   <ProfileIcon src={userData.profilePic}/>
   <ContactInfo>
<ContactName>{userData.name}</ContactName>
<MessageText>{userData.lastText}</MessageText>
   </ContactInfo>
   <MessageTime>{userData.lastTextTime}</MessageTime>
   </ContactItem>;
  
};
 const ContactListComponents = (props)=>{
const {imageUrl}=props
const [searchString, setSearchString] = useState("");
const [searchResult, setSearchResult] = useState("");

const onSearchTextChanged = async (searchText) => {
  setSearchString(searchText);
  if (!utility.validateEmail(searchText)) return;

  const userData = await httpManager.searchUser(searchText);
  if (userData.data?.successs) setSearchResult(userData.data.responseData);

  console.log("121",userData);
  };
       return(
        < Container>
        <ProfileInfoDiv>
        <ProfileImage src={imageUrl||"/image/elon.jpeg"}/>
            </ProfileInfoDiv>
            <SearchBox>
              <SearchContainer>
                <SearchIcon
                src={"/image/search-icon.svg"} />
               <SearchInput
            placeholder="Search or start new chat"
            value={searchString}
            onChange={(e) => onSearchTextChanged(e.target.value)}
          />
              </SearchContainer>
              </SearchBox>
      {searchResult && (
        <SearchResults>
          <ContactComponent userData={searchResult} setChat={props.setChat} />
        </SearchResults>
      )}
      {contactList.map((userData) => (
        <ContactComponent
          userData={userData}
          setChat={props.setChat}
          
        />
      ))}

        </Container>
       );
   
   }; 
   export default ContactListComponents;