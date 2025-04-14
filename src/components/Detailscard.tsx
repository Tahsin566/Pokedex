
type DetailsProp = {
    title: string,
    value?: string | string[] | number
}

const Detailscard = ({ title, value }: DetailsProp) => {
    
    return (

        <div className=''>
            <h1 className='font-bold text-neutral-600 text-xl'>{title || 'N/A'}</h1>
            <p>{ value || 'N/A'}</p>
        </div>
    )
}

export default Detailscard