const qrcode = require("qrcode-terminal");
const fs = require("fs");
const { Client, LegacySessionAuth } = require("whatsapp-web.js");

const client = new Client();

// Path where the session data will be stored
const SESSION_FILE_PATH = "./session.json";

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", (session) => {
  console.log("¡Whatsapp ya está conectado!");
});

client.initialize();

let nome = "";
let email = "";

client.on("message", async (message) => {
  const contact = await message.getContact();

  if (message.body === "Hola") {
    if (nome === "") {
      client.sendMessage(message.from, "¿Me permites saber tu nombre?");
      message.reply("Gracias por contactarnos, somos Interact Latam");
    } else {
      client.sendMessage(
        message.from,
        `Hola ${nome}, a continuacion te dare unas opciones segun tu interes.`
      );
      client.sendMessage(
        message.from,
        "1. Quiero Conocer \n2. Quiero Comprar\n3. Quiero ser Aliado \n4. otro"
      ); // opciones principales
    }
  } else if (
    message.body !== null &&
    message.body !== "Hola, tengo interés en conocer interact solutions" &&
    nome === ""
  ) {
    nome = message.body;
    console.log(nome);
    client.sendMessage(
      message.from,
      `Hola ${nome}, te voy a enviar las opciones  que ofrecemos.`
    );
    client.sendMessage(
      message.from,
      "1. Quiero Conocer \n2. Quiero Comprar\n3. Quiero ser Aliado \n4. otro"
    ); //menu principal

    //////////////////////////////////

    //MENU DE Quiero Conocer
  } else if (message.body !== null && message.body === "1") {
    client.sendMessage(
      message.from,
      `1.1 Solucion \n1.2 Productos \n1.3 Servicios \n00. Volver al menu inicial`
    );

    //1.1 Solucion
  } else if (message.body !== null && message.body === "1.1") {
    // Enviar enlace a la página correspondiente
    const link = "https://www.interactsolutions.com/";
    const messageText = `Haz clic en el siguiente enlace para ver las soluciones de Interact Solutions  ${link}`;
    client.sendMessage(message.from, messageText);
    client.sendMessage(message.from, "00. Volver al menú inicial");

    //1.2 Productos
  } else if (message.body !== null && message.body === "1.2") {
    // Enviar enlace a la página correspondiente
    const link = "https://www.interact.com.br/produto/";
    const messageText = `Haz clic en el siguiente enlace para ver nuestros productos de Interact Solutions ${link}`;
    client.sendMessage(message.from, messageText);
    client.sendMessage(message.from, "00. Volver al menú inicial");

    //1.2 Servicios
  } else if (message.body !== null && message.body === "1.3") {
    // Enviar enlace a la página correspondiente
    const link = "https://www.interactsolutions.com/interact-store/";
    const messageText = `Haz clic en el siguiente enlace para ver nuestros servicios de Interact Solutions ${link}`;
    client.sendMessage(message.from, messageText);
    client.sendMessage(message.from, "00. Volver al menú inicial");

    ////////////////////////////////////////////////////////////////

    //MENU DE Quiero Comprar
  } else if (message.body !== null && message.body === "2") {
    client.sendMessage(
    message.from,
      `a Solucion \nb Productos \nc Volver al menu inicial`
    );

    //SOLUCION
  } else if (message.body !== null && message.body === "a") {
    await client.sendMessage(
    essage.from,
      "01. Recibir Contenido por Correo\n02. Recibir Contenido por WhatsApp\n03. Volver"
    );
  }
  //RESPUESTA SI LA PERSONA QUIERE RECIBIR INFORMACIÓN POR CORREO
  if (message.body === "01") {
      if (email === "") {
      client.sendMessage(message.from, "¿Me permites tu email?");
      // Esperar respuesta del usuario
      client.on("message", (response) => {
        // Verificar si el mensaje recibido proviene del mismo usuario
      if (response.from === message.from) {
          // Actualizar la variable 'email' con la respuesta del usuario
          email = response.body;
          client.sendMessage(
            message.from,
            `Perfecto, te enviaremos la informacion de soluciones  que solicitaste  a este email ${email}`
          );
        }
      });
    } else {
      client.sendMessage(
      message.from,
        `Perfecto, te enviaremos un correo a este email ${email}`
      );
    }
  }

  //SI LA PERSONA QUIERE RECIBIR INFORMACION POR WATHSAPP
  else if (message.body !== null && message.body === "02") {
    client.sendMessage(
    message.from,
    client.sendMessage(
    message.from,
        `Perfecto, te enviaremos la informacion de soluciones que solicitaste a tu Wathapp`
      )
    );
  }

  // devolver al menu principal
  else if (message.body !== null && message.body === "03") {
    client.sendMessage(
    message.from,
      "01. Recibir Contenido por Correo\n02. Recibir Contenido por WhatsApp\n03. Volver"
    );
  }

  //PRODUCTOS
    else if (message.body !== null && message.body === "b") {
    await client.sendMessage(
    message.from,
      "01. Recibir Contenido por Correo\n02. Recibir Contenido por WhatsApp\n03. Volver"
    );
  }

  //RESPUESTA SI LA PERSONA QUIERE RECIBIR INFORMACIÓN POR CORREO
  if (message.body === "01") {
    if (email === "") {
      client.sendMessage(message.from, "¿Me permites tu email?");
      // Esperar respuesta del usuario
      client.on("message", (response) => {
        // Verificar si el mensaje recibido proviene del mismo usuario
        if (response.from === message.from) {
          // Actualizar la variable 'email' con la respuesta del usuario
          email = response.body;
          client.sendMessage(
            message.from,
            `Perfecto, te enviaremos la informacion de productos que solicitaste  a este email ${email}`
          );
        }
      });
    } else {
      client.sendMessage(
        message.from,
        `Perfecto, te enviaremos un correo a este email ${email}`
      );
    }
  }

  //SI LA PERSONA QUIERE RECIBIR INFORMACION POR WATHSAPP
  else if (message.body !== null && message.body === "02") {
    client.sendMessage(
    message.from,
    client.sendMessage(
    message.from,
        `Perfecto, te enviaremos la informacion de productos que solicitaste a tu Wathapp`
      )
    );
  }
  // devolver al menu principal
  else if (message.body !== null && message.body === "03") {
    client.sendMessage(
    message.from,
      "01. Recibir Contenido por Correo\n02. Recibir Contenido por WhatsApp\n00. Volver"
    );
  }

  ////////////////////////////////////////////////////////////////

  //MENU DE Quiero ser Aliado
  else if (message.body !== null && message.body === "3") {
    // Enviar enlace a la página correspondiente
    const link = "https://www.interactsolutions.com/seja-um-parceiro/";
    const messageText = `Haz clic en el siguiente enlace para ser uno de nuestros aliados de Interact Solutions ${link}`;
    client.sendMessage(message.from, messageText);
    client.sendMessage(message.from, "00. Volver al menú inicial");

    ////////////////////////////////////////////////////////////////

    //MENU DE OTRO
  } else if (message.body !== null && message.body === "4") {
    // otro
      setTimeout(function () {
      message.reply(
        `@${contact.number}` +
          " seu contato ja foi encaminhado para um dos nos atendentes"
      );
      client.sendMessage(
        "573115826096@c.us",
        "Cliente esperando entrar en contacto con: https://wa.me/" +
          `${contact.number}`
      );
    }, 1000 + Math.floor(Math.random() * 1000));
  } else if (message.body !== null && message.body === "00") {
    ///devuelve al menu anterios
    client.sendMessage(
      message.from,
      "1. Quiero Conocer \n2. Quiero Comprar\n3. Quiero ser Aliado \n4. otro"
    );
  }
});
