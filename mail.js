/**
 * Created by Somto on 29/06/2018.
 */
require('dotenv').config()
var request = require('request');
var Jusibe = require('jusibe');
const axios = require('axios');
// let jusibe = new Jusibe(process.env.JUSIBE_PUBLIC_KEY, process.env.JUSIBE_ACCESS_TOKEN);

let mg = require('nodemailer-mailgun-transport');

const Email = require('email-templates').EmailTemplate;
let nodemailer = require('nodemailer');

let auth = {
    auth: {
        api_key: 'key-01c7fc84f6ea931e434cfc537630dd34',
        domain: 'citizensraffle.org'
    },
    // proxy: 'http://user:pass@localhost:8080' // optional proxy, default is false
}
let transporter = nodemailer.createTransport(mg(auth));

// create template based sender function
// assumes text.{ext} and html.{ext} in template/directory
let sendResetPasswordLink = transporter.templateSender(
    new Email('./templates/reset'), {
    from: ' Victoria Travels info@victoriatravels.com.ng',
});
let orderEmail = transporter.templateSender(
    new Email('./templates/order'), {
    from: ' Victoria Travels info@victoriatravels.com.ng',
});
let newEmail = transporter.templateSender(
    new Email('./templates/new'), {
    from: ' Victoria Travels info@victoriatravels.com.ng',
});
let rejectEmail = transporter.templateSender(
    new Email('./templates/reject'), {
    from: ' Victoria Travels info@victoriatravels.com.ng',
});

exports.reset = function (email, link, name) {
    // transporter.template
    sendResetPasswordLink({
        to: email,
        subject: 'Password Reset - Victoria Travels'
    }, {
        name: name,
        link: link
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            // console.log('Link sent\n' + JSON.stringify(info));
        }
    });
};

exports.order = function (email, amount, games, name, ticketId) {
    // transporter.template
    orderEmail({
        to: email,
        subject: 'Ticket Purchased ' + ticketId + ' - Victoria Travels'
    }, {
        name: name,
        amount: amount,
        ticketId: ticketId,
        games: games
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            // console.log('Link sent\n' + JSON.stringify(info));
        }
    });
};

exports.approve = function (email, name, message) {
    // transporter.template
    orderEmail({
        to: email,
        subject: 'Agents Application Status - Victoria Travels'
    }, {
        name: name,
        message: message
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
        }
    });
};
exports.reject = function (email, name, message, link) {
    // transporter.template
    console.log(email);

    rejectEmail({
        to: email,
        subject: 'Agents Application Status - Victoria Travels'
    }, {
        name: name,
        message: message,
        link: link
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
        }
    });
};
exports.new = function (email, link) {
    // transporter.template
    newEmail({
        to: email,
        subject: 'Confirm your email address - Victoria Travels'
    }, {
        // name: name,
        link: link,

    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
        }
    });
};
exports.sms = (to, message) => {
    let payload = {
        to: to,
        from: process.env.JUSIBE_FROM,
        message: message
    };

    jusibe.sendSMS(payload)
        .then(res => {
            console.log(res.body);
        })
        .catch(err => {
            console.log(err.body);
        });
}
exports.sendNewAgent = (data) => {
    let to = data.phone;

    let body = 'Dear agent, your CCR account has been approved. You can now login at https://agent.citizensraffle.org. Welcome onboard!'
    // let body = 'Your ticket for the draws on 31.10.2020 is ' + combination + '. Watch live draws on www.citizensraffle.org at 10.00am.'
    var options = {
        'method': 'POST',
        'url': 'https://whispersms.xyz/api/send_message/',
        'headers': {
            'Authorization': 'Api_key gAAAAABksTmfXCVUWomTVmX07W_kcVuXYSt3wISuLt274b3C9JttFqPKRqwdeGYqpkRLBttZw2h9RxXEcY5-wQ0zPRjUdSglZigFXw2uCr0Dql_bbJcCemOYzDiyfA6RembutCpPL2VkJtlMc6TO67oC1l9bj_3_jQ==',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "contacts": [
                to
            ],
            "sender_id": "CitizensRaf",
            "message": body,
            "priority_route": false,
            "campaign_name": "API Docs"
        })

    };
    axios(options).then(function (response) {
        console.log(response.data);
    })
        .catch(function (error) {
            console.log(error);
        });

}
exports.sendNewTicket = (data) => {

    let from = "CitizensRaf"
    let to = data.phone;

    let combo = data.games;
    let combination = ""
    combo.forEach(element => {
        combination = combination + ' ' + element.combination;
    });

    let body = 'Your ticket for the draws on 02.12.2023 is ' + combination + '. Watch live draws on all NTA stations at 8.00am.'
    var options = {
        'method': 'POST',
        'url': 'https://whispersms.xyz/api/send_message/',
        'headers': {
            'Authorization': 'Api_key gAAAAABksTmfXCVUWomTVmX07W_kcVuXYSt3wISuLt274b3C9JttFqPKRqwdeGYqpkRLBttZw2h9RxXEcY5-wQ0zPRjUdSglZigFXw2uCr0Dql_bbJcCemOYzDiyfA6RembutCpPL2VkJtlMc6TO67oC1l9bj_3_jQ==',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "contacts": [
                to
            ],
            "sender_id": "CitizensRaf",
            "message": body,
            "priority_route": false,
            "campaign_name": "API Docs"
        })

    };
    axios(options).then(function (response) {
        console.log(response.data);
    })
        .catch(function (error) {
            console.log(error);
        });
    //   request(options, function (error, response) {
    //     if (error) throw new Error(error);
    //     console.log(response);
    //   });

}
exports.sendNewUserTicket = (data, user) => {
    console.log(combo)
    console.log(combo)
    console.log(combo)
    let from = "CitizensRaf"
    let to = user.phone
    console.log('====================================');
    console.log(to);
    console.log('====================================');
    let combo = data.games;
    let combination = ""
    combo.forEach(element => {
        combination = combination + ' ' + element.combination;
    });

    let body = 'Your ticket for the draws on 02.12.2023 is ' + combination + '. Watch live draws on all NTA stations at 8.00am.'
    var options = {
        'method': 'POST',
        'url': 'https://whispersms.xyz/api/send_message/',
        'headers': {
            'Authorization': 'Api_key gAAAAABksTmfXCVUWomTVmX07W_kcVuXYSt3wISuLt274b3C9JttFqPKRqwdeGYqpkRLBttZw2h9RxXEcY5-wQ0zPRjUdSglZigFXw2uCr0Dql_bbJcCemOYzDiyfA6RembutCpPL2VkJtlMc6TO67oC1l9bj_3_jQ==',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "contacts": [
                to
            ],
            "sender_id": "CitizensRaf",
            "message": body,
            "priority_route": false,
            "campaign_name": "API Docs"
        })

    };
    axios(options).then(function (response) {
        console.log(response.data);
    })
        .catch(function (error) {
            console.log(error);
        });
    //   request(options, function (error, response) {
    //     if (error) throw new Error(error);
    //     console.log(response.body);
    //   });
}
exports.sendBulk = (message, data) => {
    
    let to =  data

    var options = {
        'method': 'POST',
        'url': 'https://whispersms.xyz/api/send_message/',
        'headers': {
          'Authorization': 'Api_key gAAAAABksTmfXCVUWomTVmX07W_kcVuXYSt3wISuLt274b3C9JttFqPKRqwdeGYqpkRLBttZw2h9RxXEcY5-wQ0zPRjUdSglZigFXw2uCr0Dql_bbJcCemOYzDiyfA6RembutCpPL2VkJtlMc6TO67oC1l9bj_3_jQ==',
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          "contacts": [
           to
          ],
          "sender_id": "CitizensRaf",
          "message": message,
          "priority_route": false,
          "campaign_name": "API Docs"
        })
      
      };
      axios(options).then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    //   request(options, function (error, response) {
    //     if (error) throw new Error(error);
    //     console.log(response);
    //   });

}
