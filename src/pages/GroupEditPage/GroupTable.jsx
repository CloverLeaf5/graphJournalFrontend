import { Table } from 'evergreen-ui';
import React from 'react'


const GroupTable = (props) => {

    const TABLE_WIDTH = 300;
    
    return (
        <div className="group-table">
            {props.groupsArray.length > 0 && <Table.Head>
                <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>Groups</Table.TextCell>
            </Table.Head>}
            <Table.Body>
                {props.groupsArray.map((group, idx) => 
                    <Table.Row key={idx} isSelectable={true} onSelect={()=>props.handleClick(idx)}>
                        <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>
                            {group.title}
                        </Table.TextCell>
                    </Table.Row>
                )}
            </Table.Body>
        </div>
    )
}

export default GroupTable