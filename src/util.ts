type GetElementType = (
  dataAttribute: string,
  parent?: HTMLElement | Document | DocumentFragment
) => HTMLElement;

export const getElement: GetElementType = (
  dataAttribute,
  parent = document
) => {
  const element = parent.querySelector(
    `[data-${dataAttribute}]`
  ) as HTMLElement;

  return element;
};

export function appendDegreeElement(element: HTMLElement) {
  element.append(getDegreeCelciusElement());
}

export function appendPrecipitationUnit(element: HTMLElement) {
  const span = document.createElement("span");
  span.innerHTML = " mm";
  element.append(span);
}

export function appendWindSpeedUnit(element: HTMLElement) {
  const span = document.createElement("span");
  span.innerHTML = " km/h";
  element.append(span);
}

export function appendHumidityUnit(element: HTMLElement) {
  const span = document.createElement("span");
  span.innerHTML = "%";
  element.append(span);
}

function getDegreeCelciusElement() {
  const span = document.createElement("span");
  span.innerHTML = "&deg;C";
  return span;
}

export function getDateTime(isoDateString: string) {
  const date = new Date(isoDateString);

  return {
    date: getDate(date),
    time: getTime(date),
  };
}

export function setElementContent(
  element: HTMLElement,
  value: number | string,
  isDegreeElement: boolean = false
) {
  element.textContent = value.toString();

  if (isDegreeElement) appendDegreeElement(element);
}

function getDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    weekday: "long",
    day: "2-digit",
    year: "2-digit",
  }).format(date);
}

export function getDay(isoDateString: string) {
  const date = new Date(isoDateString);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(date);
}

function getTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function checkIfCurrentHour(isoDateString: string) {
  const date = new Date(isoDateString);

  return date.getHours() === new Date().getHours();
}

export function getDateAndMonth(isoDateString: string) {
  const date = new Date(isoDateString);

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
  }).format(date);
}

export function removeBodyBlur() {
  document.body.classList.remove("blurred");
}

export function getUVIndexScaleValue(uvIndex: number) {
  if (uvIndex <= 2) return "Low";

  if (uvIndex <= 5) return "Moderate";

  if (uvIndex <= 7) return "High";

  if (uvIndex <= 10) return "Very High";
  else return "Extreme";
}
