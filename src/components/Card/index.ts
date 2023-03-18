export function background(temp: number): string {
  if (Math.round(temp - 273) < 5) {
    return "cold";
  } else if (Math.round(temp - 273) >= 5 && Math.round(temp - 273) <= 18) {
    return "warm";
  } else {
    return "hot";
  }
}

export function tempDescription(temp: number): string {
  let result: string = "";
  switch (background(temp)) {
    case "cold":
      result = "But it is cold today, so dress warmly";
      break;
    case "warm":
      result = "It is warm, so you cannot wear your winter jacket:)";
      break;
    case "hot":
      result = "It is hot today. Try to dress as lightly as you can.";
  }
  return result;
}

export function weatherDescription(weather: string, temp: number): string {
  let result: string = "";
  switch (weather) {
    case "Thunderstorm" || "Tornado":
      result =
        "Today it is dangerous outside. It would be better if you stay home and, for example, watch Netflix today.";
      break;
    case "Drizzle":
      result =
        "Oooh it is drizzling outside. It isn't a good oportunity to walking, but if you must go outside it would be better if you wear raincoat.";
      break;
    case "Rain":
      result =
        "Oh no, it is raining. Not a good idea to do something outside today, but if you have your own vegetable garden, it will help your plants grow better and, as a result, have a good harvest:)";
      break;
    case "Snow":
      result =
        "Wow, it is snowing!!! A great opportunity play snowballs(if it is enough snow), for example, or just walking in the park.";
      break;
    case "Mist" ||
      "Smoke" ||
      "Sand" ||
      "Haze" ||
      "Dust" ||
      "Fog" ||
      "Ash" ||
      "Squall":
      result =
        "Oh, it is difficult to see something. Be carefull, when you are croossing streets, because drivers has less visibility.";
      break;
    case "Clear":
      result = `Look, it is clear sky outside. It is a great opportunity to go walking around the streets or do some sports outside, because the sun is shining!!! ${tempDescription(
        temp
      )}`;
      break;
    case "Clouds":
      result = `The sky is in the clouds today. But fortunately, it isn't raining today, so if you have time it isn't a bad idea to do something outside. ${tempDescription(
        temp
      )}`;
      break;
  }
  return result;
}

export function weatherImage(weather: string, temp: number): string {
  let result: string = "";
  switch (weather) {
    case "Thunderstorm":
      result = "../assets/Thunderstorm.jpg";
      break;
    case "Tornado":
      result = "../assets/Tornado.jpg";
      break;
    case "Drizzle":
      result = "../assets/Drizzle.jpg";
      break;
    case "Rain":
      result = "../assets/Rain.jpg";
      break;
    case "Snow":
      result = "../assets/snow.jpg";
      break;
    case "Mist" ||
      "Smoke" ||
      "Sand" ||
      "Haze" ||
      "Dust" ||
      "Fog" ||
      "Ash" ||
      "Squall":
      result = "../assets/Mist.jpg";
      break;
    case "Clear":
      if (background(temp) === "hot") {
        result = "../assets/hotClearSky.jpg";
      } else if (background(temp) === "warm") {
        result = "../assets/warmClearSky.jpg";
      } else {
        result = "../assets/coldClearSky.jpg";
      }
      break;
    case "Clouds":
      result = "../assets/clouds.jpg";
      break;
  }
  return result;
}

export const weekday: Array<string> = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const month: Array<string> = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
