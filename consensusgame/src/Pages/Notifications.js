import React, { Component } from "react";
import thumbsUpIcon from "../assets/icons/notifications/thumbs-up.png";
import newIcon from "../assets/icons/notifications/new.png";
import voteIcon from "../assets/icons/votetime-icon.png";
import thumbsDownIcon from "../assets/icons/thumbdown-icon.png";
import referralIcon from "../assets/icons/referralsuccess-icon.png";
import successIcon from "../assets/icons/successfulcon-icon.png";
import "./Notifications.scss";
{/* todo: need to hook up these icons to array below...
import thumbsUpIcon from "../assets/icons/notifications/thumbs-up.png";
import newIcon from "../assets/icons/notifications/new.png";
*/}



class Notifications extends Component {
  render() {
    const notifications = [
      {
        title: "Congrates! Successful Consensus!",
        description: "@cburniske is up 25.2%",
        time: "3 Aug",
        icon: thumbsUpIcon
      },
      {
        title: "New Poll",
        description: "It is a great time to make an impact",
        time: "10 Aug",
        icon: newIcon
      },
      {
        title: "Time to vote",
        description: "Remove @scamcoin?",
        time: "12 Aug",
        icon: voteIcon
      },
      {
        title: "Congrates! Successful Consensus!",
        description: "@cburniske is up 25.2%",
        time: "14 Aug",
        icon: successIcon
      },
      {
        title: "Oops! Weak Consensus",
        description: "@kalesamani is down 13.6%",
        time: "19 Aug",
        icon: thumbsDownIcon
      },
      {
        title: "Referral Success",
        description: "Seamus has joined - 500 merits earned",
        time: "26 Aug",
        icon: referralIcon
      }
    ];
    return (
      <div className="layout notifications">
        <aside className="col">
          <h1 className="lg-vspace">Notifications</h1>
          <h6>Stay updated about your recent activities</h6>
          {/* Add polls link?? */}
        </aside>

        <section className="col">
          <ul className="messages md-vspace">
            {notifications.map(notification => (
              <li key={notification.title} className="card yellow">
                <div className="card-container">
                  <div className="flex">
                    <i><img src={notification.icon} alt="icon" /></i>
                    <div className="msg-details">
                      <h2>{notification.title}</h2>
                      <h3>{notification.description}</h3>
                    </div>
                  </div>
                </div>
                {/*<h4>{notification.time}</h4>*/}
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}

export default Notifications;
