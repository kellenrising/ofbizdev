
/**
Generate a pass-by object that matches the
SOAP protocol of ofbiz and arg is a pass-value object
*/
export function soapCreator(arg) {
  const obj = {
    'map-Map': {
      'map-Entry': []
    }
  };
  for (const key in arg) {
    if (Object.hasOwnProperty.call(arg, key)) {
      obj['map-Map']['map-Entry'].push({
        'map-Key': {
          'std-String': {
            'attributes': {
              'value': key
            }
          }
        },
        'map-Value': {
          'std-String': {
            'attributes': {
              'value': arg[key]
            }
          }
        }
      });
    }
  }
  return obj;
}

/**
Parse the returned soap object, and get the specified
value, keys array of attribute names that are intended to get the return value
*/
export function soapParser(obj, keys) {
  const result = {};
  const entries = obj['map-Map']['map-Entry'];
  for (const entry of entries) {
    const { 'map-Key': mapKey, 'map-Value': mapValue } = entry;
    if (keys.indexOf(mapKey['std-String']['attributes']['value']) !== -1) {
      const key = mapKey['std-String']['attributes']['value'];
      result[key] = mapValue;
    }
  }
  return result;
}

export function getWSDL(method) {
  return `https://localhost:8443/accounting/control/SOAPService/${method}?wsdl`;
}
