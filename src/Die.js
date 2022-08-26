export default function Die(props) {

    const bgColor = {
        backgroundColor: props.onHold ? '#59E391' : 'white'
    }

    return (
      <div className='die' style={bgColor} onClick={props.holdDice} >{props.value}</div>
    )
  }
  