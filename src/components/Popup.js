import React from 'react'

import { Button } from './Button'

export const Popup = (props) => {
    const { checkedTodos, onRemove } = props;

    return (
        <div className={`popup ${checkedTodos.length > 0 ? 'popup--open' : ''}`}>
            <span className="popup__title">Bulk Action:</span>
            <div className="popup__cta">
                <Button variant='done' text='Done' />
                <Button variant='remove' text='Remove' onClick={() => onRemove(checkedTodos)} />
            </div>
        </div>
    )
}
