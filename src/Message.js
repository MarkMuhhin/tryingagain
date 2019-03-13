import React from "react";

/* Message abil paneme põhimõtteliselt kokku sõnumite htmli.
   Vaatame, milline sõnu on kelle oma(kasutaja või boti) ning teeme
   olenevalt sellest teatud otsusied (paneme erinevaid className,
    selleks, et oleks kergem kirjutada cssi')*/

const Message = ({ chat, user, time, img }) => (
  <li className={`chat ${user === chat.usernamemina ? "right" : "left"}`}>
    {chat.usernamebot && (
      <img className="topbotimg" src={img} alt="gotoAndBot" />
    )}
    {chat.usernamebot && (
      <div
        className={`smallTriangle ${
          user === chat.usernamemina ? "right" : "left"
        }`}
      />
    )}
    {chat.usernamemina && (
      <div
        className={`smallTriangle ${
          user === chat.usernamemina ? "right" : "left"
        }`}
      />
    )}
    <div
      className={`usernametime ${
        user === chat.usernamemina ? "right" : "left"
      }`}
    >
      <figcaption className="usercaption">
        {user === chat.usernamemina ? chat.usernamemina : chat.usernamebot}
      </figcaption>
      <time>{time}</time>
    </div>
    {chat.content}
  </li>
);

export default Message;
