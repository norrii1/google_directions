Liting : {

  Titile  
  Recieve 
  Send 
  Initial Address
  Destination
}



const [initialAddressState, setInitialAddressState] = useState('')
  const handleIntialAddress = (event) => {
    console.log(event.target.value)
    setInitialAddressState(event.target.value)
  }

  const [destinationState, setDestinationState] = useState('')
  const handleDestination = async (address) => {
    console.log(address)
    setDestinationState(address)
  }



  function Search({ panTo }) {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 43.6532, lng: () => -79.3832 },
        radius: 100 * 1000,
      },
    });

    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

    const handleInput = (e) => {
      setValue(e.target.value);
    };

    const handleSelect = (address) => {
      setValue(address, false);
      clearSuggestions();
    };

    const handleDestSelect = (address) => {
      handleDestination(address)
      handleSelect(address)
    }
    return (
      <div className="search" style={{ 
        lineHeight: '40px'
       }}
       >
        <Combobox onSelect={handleDestSelect}>
          <ComboboxInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Search your location"
            style={{
              lineHeight: '30px',
              width: '69vw'
            }}
          />
          <ComboboxPopover 
          style={{
            backgroundColor: 'white'
          }}
          >
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    );
  }