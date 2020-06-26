import celsiusToFahrenheit from 'celsius-to-fahrenheit';

export const displayTemp = (celcius, tempMode) => {
    if (tempMode === 0) {
      return `${celcius}\u2103`;
    } else {
      return `${celsiusToFahrenheit(celcius)}\u2109`;
    }
  }
  
  