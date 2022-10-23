import { Table } from 'evergreen-ui';
import React from 'react'


const PersonTable = (props) => {

    const TABLE_WIDTH = 300;
    
    return (
        <div className="person-table">
            {props.peopleArray.length > 0 && <Table.Head>
                <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>People</Table.TextCell>
            </Table.Head>}
            <Table.Body>
                {props.peopleArray.map((people, idx) => 
                    <Table.Row key={idx} isSelectable={true} onSelect={()=>props.handleClick(idx)}>
                        <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>
                            {people.title}
                        </Table.TextCell>
                    </Table.Row>
                )}
            </Table.Body>
        </div>
    )
}

export default PersonTable