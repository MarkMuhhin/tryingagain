import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import botpic from "./botpic.png";
import Message from "./Message.js";

class Chatroom extends React.Component {
  constructor(props) {
    super(props);

    /* Tekitan siia mõned kasutaja ja gotoAndBoti vahelised tekstid.
    Hiljem lisan siia veel neid, kui kasutaja trükib midagi sisse. */

    this.state = {
      chats: [
        {
          usernamemina: "Mina",
          content: <p>Tere!</p>,
          time: this.showTime()
        },
        {
          usernamebot: "gotoAndBot",
          content: <p>Tere-tere vana kere!</p>,
          time: this.showTime()
        },
        {
          usernamemina: "Mina",
          content: <p>Mis kell on?</p>,
          time: this.showTime()
        },
        {
          usernamebot: "gotoAndBot",
          content: <p>Kell on 11:20</p>,
          time: this.showTime()
        },
        {
          usernamemina: "Mina",
          content: <p>Mitme pöialpoisiga elas Lumivalguke metsamajas?</p>,
          time: this.showTime()
        },
        {
          usernamebot: "gotoAndBot",
          content: <p>Lumivalguke elas koos 7 pöialpoisiga</p>,
          time: this.showTime()
        }
      ]
    };
  }

  /*Teen kergema funktsiooni praeguse aja saamiseks, et hiljem kasutada seda iga tekstboxi üleval.*/
  showTime() {
    var time = new Date();
    return (
      (time.getHours() < 10 ? "0" : "") +
      time.getHours() +
      ":" +
      (time.getMinutes() < 10 ? "0" : "") +
      time.getMinutes()
    );
  }

  /*Teen funktsiooni ekraani alla scrollimiseks. Selle võis põhimõtteliselt ka kohe componentDidUpdate sisse panna,
    sest midagi muud sinna enam ei lähe. */
  scrollToBot() {
    ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(
      this.refs.chats
    ).scrollHeight;
  }

  /*Jooksutan mõned funktsioonid siin, kui componenti uuendatakse. */
  componentDidUpdate() {
    this.scrollToBot();
  }

  /* Selle funktsiooni abil saab json informatsiooni ilma kohta. */
  async whatsTheWeather(name) {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&APPID=6830cd661891ae9211acf8d140e81ceb`
    ).then(response => response.json());
  }
  /* Selle funktsiooni abil saab json informatsiooni valuuta kohta. */
  async moneyConvert(from, to) {
    return fetch(
      `https://free.currencyconverterapi.com/api/v6/convert?q=${from}_${to}&compact=ultra&apiKey=562a0c71c4951a81723f`
    ).then(response => response.json());
  }

  /* whatIsIt on selle programmi üks suurim funktsioon. Siin võtame vastu kasutaja trükitud teksti inputi ning vaatame, mis sellega edasi saab teha.

    1) Kui kirjutatakse sõna calculate, siis vaatame esiteks, kas sellele järgneb üldse mingi sõne. Kui järgneb, siis vaatame,
       kas too sõne sobib mingisuguseks arvutuseks.  Kui ei sobi, siis robot protestib.

    2) Kui kirjutatakse võtmesõna convert, siis programm otsib kolm argumenti, mida ta saaks kasutada konverteerimise funktsioonis.
       Peale võtmesõna convert peab rangelt tulema arvuline näitaja, mille järel on valuuta nimetus ning selle järel "to" või mitte midagi,
       ning jälle valuuta nimetus.

    3) Kui kirjutatakse sõna weather, siis proovib programm kustutada kõik weather sõnale (weather kaasarvatud) eelneva sõne jupi
       ning kasutab saadud juppi ehk linna nimetust, et leida  informatsiooni ilma kohta. Kui sellise linna nimetusega ei leita
       andmebaasist informatsiooni, siis robot protestib.

    4) Kui kasutaja ei kirjuta ühtegi eelnevalt mainitud märksõna, siis robot ütleb, et ei saa kasutajast aru*/

  async whatIsIt(message) {
    if (
      message.toLowerCase().includes("calculate") &&
      message
        .toLowerCase()
        .split("calculate")
        .pop()
        .replace(/ /g, "").length !== 0
    ) {
      try {
        let removeStuff = message
          .toLowerCase()
          .replace(/[?=]/g, "")
          .replace(/[,=]/g, ".")
          .split("calculate")
          .pop();
        let calculate = eval(removeStuff);
        return `The answer is ${calculate}`;
      } catch {
        return "This does not seem like a valid mathematical calculation. Please try again.";
      }
    } else if (message.toLowerCase().includes("convert")) {
      try {
        let removeStuff = message
          .toLowerCase()
          .split("convert")
          .pop()
          .replace(/to/g, "")
          .replace(/[?=]/g, "");
        let convdata = removeStuff.split(" ").filter(Boolean);
        if (
          convdata[0].length !== 0 &&
          convdata[0] > 0 &&
          convdata[1].length === 3 &&
          convdata[2].length === 3 &&
          isFinite(convdata[0])
        ) {
          console.log(convdata[0]);
          const data = await this.moneyConvert(convdata[1], convdata[2]);
          let datastring = JSON.stringify(data).replace(/[^0-9.]/g, "");
          let finalvalue = datastring * convdata[0];

          if (finalvalue !== 0) {
            return `${
              convdata[0]
            } ${convdata[1].toUpperCase()} would be about ${finalvalue.toFixed(
              2
            )} ${convdata[2].toUpperCase()}`;
          } else return "Hmm, these seem to be the wrong country codes";
        } else {
          return "This conversion doesn't look right.";
        }
      } catch {
        return "I can't reallyunderstand. Could you ask me differently?";
      }
    } else if (message.toLowerCase().includes("weather")) {
      try {
        let words = message.toLowerCase().split(" ");
        let city = words[words.length - 1].replace(/[^\w\s]/gi, "");
        const data = await this.whatsTheWeather(city);
        return `${city.toUpperCase()}: temperature is ${Math.round(
          data.main.temp
        )}°, wind is ${data.wind.speed}m/s, humidity is ${data.main.humidity}%`;
      } catch {
        return "Hmmm... there doesn't seem to be a city with such a name in my database ";
      }
    } else
      return "Sorry, but I don't understand. You can try using 'calculate 5*5' for example or ask me about the weather of a certain city.... or maybe convert some currency?";
  }

  /* Selles funktsioonis uuendame chats state'i*/
  async submitMessage(e) {
    e.preventDefault();
    const content = await this.whatIsIt(
      ReactDOM.findDOMNode(this.refs.msg).value
    );

    if (
      ReactDOM.findDOMNode(this.refs.msg).value.replace(/\s/g, "").length !== 0
    ) {
      this.setState(
        {
          chats: this.state.chats.concat([
            {
              usernamemina: "Mina",
              content: <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>,
              time: this.showTime()
            },
            {
              usernamebot: "gotoAndBot",
              content: <p>{content}</p>,
              time: this.showTime()
            }
          ])
        },
        () => {
          ReactDOM.findDOMNode(this.refs.msg).value = "";
        }
      );
    }
  }

  /* Siia kirjutame htmli*/

  render() {
    const usernamemina = "Mina";
    const { chats } = this.state;

    return (
      <div className="chatroom">
        <header>
          <figure>
            <img src={botpic} alt="botpic.png" />
            <figcaption className="botcaption">gotoAndBot</figcaption>
          </figure>{" "}
        </header>
        <main className="chats" ref="chats">
          {chats.map((chat, index) => (
            <div className="fullcomment" key={index}>
              <Message
                chat={chat}
                user={usernamemina}
                time={chat.time}
                img={botpic}
              />
            </div>
          ))}
        </main>
        <footer>
          <form className="input" onSubmit={e => this.submitMessage(e)}>
            <div className="inputdiv">
              <input
                className="inputtext"
                id="idText"
                name="nameText"
                type="text"
                ref="msg"
                placeholder="Kirjuta siia"
              />
              <label className="footerlabel">
                <input className="inputSubmit" type="submit" value="" />
                <svg className="svg">
                  <path d="M0 0 L2 0 L9.33 6.66 L2 14 L1 13.33 L7.33 6.66 Z" />
                </svg>
              </label>
            </div>
          </form>
        </footer>
      </div>
    );
  }
}

export default Chatroom;
