import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
const Star = ({ starValue = 5, onRateChange }) => {
    let [rating, setRating] = useState(0)
    let [hover, setHover] = useState(0)
    return (
        <div className='flex gap-1'>
            {
                [...Array(starValue)].map((_, index) => {
                    const currentStarValue = index + 1;
                    const isFilled = currentStarValue <= (hover || rating)
                    return (
                        <span key={currentStarValue}
                            onClick={() => {
                                setRating(currentStarValue)
                                onRateChange && onRateChange(currentStarValue)
                            }}
                            onMouseEnter={() => setHover(currentStarValue)}
                            onMouseLeave={() => setHover(0)}
                        >
                            <FaStar color={isFilled ? "gold" : "gray"} className='cursor-pointer text-2xl' />
                        </span>
                    )
                })
            }
        </div>
    )
}

export default Star