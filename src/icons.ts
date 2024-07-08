const ICONS = new Map<number, string>();

setIconMap([0, 1], "sun");
setIconMap([2], "partly-cloudy");
setIconMap([3], "cloud");
setIconMap([45, 48], "overcast");
setIconMap([51, 61, 80], "rainy-light");
setIconMap([53, 63, 81], "rainy-moderate");
setIconMap([55, 65, 82], "rainy-heavy");
setIconMap([56, 57, 66, 67], "rainy-snow");
setIconMap([71, 85], "snow-light");
setIconMap([73], "snow-moderate");
setIconMap([75, 77, 86], "snow-heavy");
setIconMap([95], "thunderstorm");
setIconMap([96, 99], "hail");

function setIconMap(codes: number[], value: string): void {
  codes.forEach((code) => {
    ICONS.set(code, value);
  });
}

export function getIconUrl(iconCode: number) {
  const icon = ICONS.get(iconCode);

  if (!icon) return `/icons/cloud.svg`;

  return `/icons/${icon}.svg`;
}

export default ICONS;
