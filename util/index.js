import celsiusToFahrenheit from 'celsius-to-fahrenheit';

export const displayTemp = (celcius, tempMode) => {
    if (tempMode === 0) {
      return `${Number(celcius).toFixed(1)}\u2103`;
    } else {
      return `${celsiusToFahrenheit(celcius).toFixed(1)}\u2109`;
    }
  }
  
  