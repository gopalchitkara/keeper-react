import React, { useEffect, useState, useRef, useContext, Fragment } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import move from 'array-move'
import SavedNote from './SavedNote'
import SavedLink from './SavedLink'
import SavedList from './SavedList'
import './SavedItemsDndGrid.css'
import { Row, Col, Empty } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import { GlobalStateContext } from '../../../contexts/GlobalStateContext'

function isColliding(source, sample, threshold = 0.5) {
    return (
        source.x < sample.x + sample.width - threshold * sample.width &&
        source.x + source.width > sample.x + threshold * sample.width &&
        source.y < sample.y + sample.height - threshold * sample.height &&
        source.y + source.height > sample.y + threshold * sample.height
    )
}

function mergePointIntoPosition(position, point) {
    return {
        ...position,
        x: position.x + point.x,
        y: position.y + point.y,
    }
}

function getBoundsWithoutTransform(element) {
    const transform = element.style.transform
    element.style.transform = ''
    const bounds = element.getBoundingClientRect()
    element.style.transform = transform
    return bounds
}

function getBox(node) {
    const bounds = getBoundsWithoutTransform(node)
    return {
        width: bounds.width,
        height: bounds.height,
        x: bounds.x,
        y: bounds.y,
    }
}

const onTop = { zIndex: 1 }
const flat = {
    zIndex: 0,
    transition: { delay: 0.3 },
}

function Cell({ item, index, moveItem, setPosition, editItemOnClick }) {
    const ref = useRef()
    const dragOriginX = useMotionValue(0)
    const dragOriginY = useMotionValue(0)
    const [dragging, setDragging] = useState(false)
    useEffect(() => {
        setPosition(index, getBox(ref.current))
    })
    return (
        <motion.div
            ref={ref}
            animate={dragging ? onTop : flat}
            transition={{ type: "tween" }}
            drag
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragElastic={1}
            dragTransition={{ min: 0, max: 100, bounceStiffness: 80, bounceDamping: 80 }}
            dragOriginX={dragOriginX}
            dragOriginY={dragOriginY}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
            onDrag={(_, { point }) => moveItem(index, point)}
            positionTransition={({ delta }) => {
                if (dragging) {
                    dragOriginX.set(dragOriginX.get() + delta.x)
                    dragOriginY.set(dragOriginY.get() + delta.y)
                }
                return !dragging
            }}
            // whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            style={{
                scale: 1,
            }}
            className="grid-item"
            onClick={(e) => editItemOnClick(e, item)}
        >
            <div className="grid-item-content">
                <SavedItemToShow item={item} key={item.id} />
            </div>
        </motion.div>
    )
}

function SavedItemToShow({ item }) {
    switch (item.type) {
        case 'note':
            return <SavedNote item={item} />;
        case 'link':
            return <SavedLink item={item} />;
        case 'list':
            return <SavedList item={item} />;
        default:
            return <></>
    }
}

function SavedItemsDndGrid() {
    const { checkingSavedItems, stateItems, setStateItems, editItem } = useContext(GlobalStateContext);

    const editItemOnClick = (e, item) => {
        e.preventDefault();
        editItem(item);
    }

    const positions = useRef([])
    const setPosition = (index, position) => {
        positions.current[index] = position
    }
    const moveItem = (currentIndex, currentPoint) => {
        const currentPosition = mergePointIntoPosition(
            positions.current[currentIndex],
            currentPoint,
        )
        const collidingIndices = []
        for (
            let positionIndex = 0;
            positionIndex < positions.current.length;
            positionIndex++
        ) {
            if (currentIndex === positionIndex) {
                continue
            }
            if (isColliding(currentPosition, positions.current[positionIndex])) {
                collidingIndices.push(positionIndex)
            }
        }
        if (collidingIndices.length > 0) {
            positions.current = move(
                positions.current,
                currentIndex,
                collidingIndices[0],
            )
            setStateItems(move(stateItems, currentIndex, collidingIndices[0]))
        }
    }
    return (
        <div className="items-container">
            {checkingSavedItems ? (
                <Row>
                    <Col xs={24} style={{ textAlign: "center", marginTop: 150 }}>
                        <LoadingOutlined style={{ fontSize: "2.4rem", }} />
                    </Col>
                </Row>
            ) : (
                    <Fragment>
                        {stateItems && stateItems.length > 0 ? (
                            <div className="items-grid">
                                {stateItems.map((item, index) => (
                                    <Cell
                                        key={item.id}
                                        index={index}
                                        item={item}
                                        moveItem={moveItem}
                                        setPosition={setPosition}
                                        editItemOnClick={editItemOnClick}
                                    />
                                ))}
                            </div>
                        ) : (
                                <Row>
                                    <Col xs={24} style={{ textAlign: "center", marginTop: 150 }}>
                                        <Empty />
                                    </Col>
                                </Row>
                            )}
                    </Fragment>
                )}

        </div>
    )
}

export default SavedItemsDndGrid
// .sort((a, b) => b.createdAt - a.createdAt)