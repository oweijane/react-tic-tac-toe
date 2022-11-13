export default function Square(props) {
  return (
    <button 
      className="square"
      onClick={props.onClick}
    >
      {props.isWinningSquare ? (
        <mark>{props.value}</mark>
      ) : (
        <>{props.value}</>
      )}

    </button>
  );
}
