import '../css/animations.css'

function AnimatedBackground({ count = 10 }) {
  return (
    <div className="area">
      <ul className="squares">
        {Array.from({ length: count }).map((_, index) => (
          <li key={index} />
        ))}
      </ul>
    </div>
  )
}

export default AnimatedBackground 