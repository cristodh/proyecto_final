import './ChooseCard.css';

// TODO dejar el icono con un if ternario segun el tipo de usuario
const ChooseCard = ({icon,title,description,selected}) => {
    return (
        <div className="choose-card" onClick={selected}>
            <div className="choose-card-icon">
                {icon}
            </div>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    );
};
export default ChooseCard;
