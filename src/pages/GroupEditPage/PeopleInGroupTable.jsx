import { Table } from 'evergreen-ui';
import React from 'react'


const PeopleInGroupTable = (props) => {

    const TABLE_WIDTH = 300;
    
    return (
        <div className="people-in-group-table">
            {props.selectedPeople.length > 0 && <Table.Head>
                <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>People in Group</Table.TextCell>
            </Table.Head>}
            <Table.Body>
                {props.selectedPeople.map((person, idx) => 
                    <Table.Row key={idx} isSelectable={true} onSelect={()=>props.personInGroupClick(idx)}>
                        <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>
                            {person.title}
                        </Table.TextCell>
                    </Table.Row>
                )}
            </Table.Body>
        </div>
    )
}

export default PeopleInGroupTable