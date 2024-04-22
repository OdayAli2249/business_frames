import './permission_group_card_style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faBoxOpen, faEdit, faExternalLinkAlt, faPenSquare, faTools, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from '../../core/button_component';
import PermissionGroupMetaDataColumn from './permission_group_meta_data_column_style';
import SpaceComponent from '../../core/space_component';

function PermissionGroupCardComponent(props) {

    return (
        <div className='branch-permission-groups-carousel-card'
            style={{
                // width: props.dialogMod ? '60%' : null,
                boxShadow: props.dialogMod ? null : '0px 0px 15px 2px rgb(216, 216, 216)'
            }}
        // key={props.id ? props.id : null}
        >
            <div className='branch-permission-groups-card-header'>
                <div className='branch-permission-groups-card-text-section'>
                    <div className='basic-m-text-size-l-text-weight'>
                        {props.permissionGroup.name}
                    </div>
                    <div className='medium-s-text-size-s-text-weight'>
                        Members {[...new Set(props.permissionGroup.userIds)].length}
                    </div>
                    {!props.dialogMod ? <div className='medium-s-text-size-s-text-weight'>
                        Products {props.permissionGroup.productIds ? [...new Set(props.permissionGroup.productIds)].length : 0}
                    </div> : <></>}
                    {!props.dialogMod ? <div className='medium-s-text-size-s-text-weight'>
                        Services {props.permissionGroup.serviceIds ? [...new Set(props.permissionGroup.serviceIds)].length : 0}
                    </div> : <></>}
                    {props.dialogMod ? <div className='medium-s-text-size-s-text-weight'
                        style={{ height: props.dialogMod ? null : '100px' }}>
                        {props.permissionGroup.description}
                    </div> : <></>}
                </div>

                <div className='branch-permission-groups-card-icons-section'>
                    <FontAwesomeIcon icon={faUsers} className='branch-permission-groups-card-main-icon' />
                    {props.dialogMod ?
                        <SpaceComponent height={'20px'} />
                        : <></>}
                    {props.dialogMod && props.permissionGroup.actions ?
                        <div className='branch-permission-groups-card-permission-operation-icons'>
                            {props.permissionGroup.actions[0] == 1 ?
                                <FontAwesomeIcon icon={faAdd}
                                    className='secondary-icon-color-m-icon-size-hover' /> : <></>}
                            <SpaceComponent width={'16px'} />
                            {props.permissionGroup.actions[1] == 1 ?
                                <FontAwesomeIcon icon={faEdit}
                                    className='secondary-icon-color-m-icon-size-hover' /> : <></>}
                            <SpaceComponent width={'16px'} />
                            {props.permissionGroup.actions[2] == 1 ?
                                <FontAwesomeIcon icon={faTrash}
                                    className='secondary-icon-color-m-icon-size-hover' /> : <></>}
                        </div>
                        : <></>}
                </div>
            </div>
            {props.dialogMod ?
                <SpaceComponent height={'20px'} />
                : <></>}
            {props.dialogMod ?
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                    <SpaceComponent height={'2px'}
                        width={'94%'}
                        color={'rgb(220,220,220'} />

                </div>
                : <></>}
            {props.dialogMod ?
                <SpaceComponent height={'20px'} />
                : <></>}
            {props.dialogMod ?
                <div className='branch-permission-groups-card-meta-data'>
                    <PermissionGroupMetaDataColumn
                        label={'Products'}
                        number={props.permissionGroup.productIds ? [...new Set(props.permissionGroup.productIds)].length : 0}
                        icon={faTools} />
                    <div className='branch-permission-groups-card-meta-data-divider' />
                    <PermissionGroupMetaDataColumn
                        label={'Services'}
                        number={props.permissionGroup.serviceIds ? [...new Set(props.permissionGroup.serviceIds)].length : 0}
                        icon={faBoxOpen} />
                    <div className='branch-permission-groups-card-meta-data-divider' />
                    <PermissionGroupMetaDataColumn
                        label={'Posts'}
                        number={props.permissionGroup.postIds ? [...new Set(props.permissionGroup.postIds)].length : 0}
                        icon={faPenSquare} />
                </div> : <></>}
            {props.dialogMod ?
                <SpaceComponent height={'20px'} />
                : <></>}
            {props.dialogMod ?
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                    <SpaceComponent height={'2px'}
                        width={'94%'}
                        color={'rgb(220,220,220'} />

                </div>
                : <></>}

            <SpaceComponent height={'20px'} />
            <div className='branch-permission-groups-card-button-section'>
                {!props.dialogMod ?
                    <ButtonComponent label={'View'} icon={faExternalLinkAlt} onClick={() => {
                        props.onShowViewDialog()
                    }} /> : <></>}
                {props.role != null && ['master', 'sub-master'].includes(props.role) ?
                    <>
                        <SpaceComponent width={'15px'} height={'15px'} />
                        <ButtonComponent label={'Edit'} icon={faEdit} onClick={() => {
                            props.onShowEditDialog()
                        }} />
                        <SpaceComponent width={'15px'} height={'15px'} />
                        <ButtonComponent label={'Remove'} icon={faTrash} onClick={() => {
                            props.onShowRemoveDialog()
                        }} /></> : <></>}
            </div>
        </div>
    );
}

export default PermissionGroupCardComponent;