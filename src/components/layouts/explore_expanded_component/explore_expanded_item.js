import './explore_expanded_item.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ExploreExpandedItem(props) {

    return (
        <div className='expanded-item'
            onClick={
                () => props.onClick()
            }>
            <div className='item-icon'>
                <FontAwesomeIcon icon={props.icon} />
            </div>
            <div className='item-text'
                style={props.selected == true ? { backgroundColor: 'rgb(200, 200, 200)' } :
                    props.highLighted == true ? { backgroundColor: 'rgb(230, 230, 230)' } : {}}>{props.text}</div>
        </div>
    );
}
export default ExploreExpandedItem;