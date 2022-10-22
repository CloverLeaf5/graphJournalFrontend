import { Table } from 'evergreen-ui';
import React from 'react'


const TagPersonTable = (props) => {

    const TABLE_WIDTH = 300;

    const handleTagClick = (idxToRemove) => {
        props.setSelectedEntryTags((prevState) => {
            return prevState.filter((tag, idx) => {
                return (idx !== idxToRemove)
            })
        })
    }

    const handlePersonClick = (idxToRemove) => {
        props.setSelectedEntryPeople((prevState) => {
            return prevState.filter((person, idx) => {
                return (idx !== idxToRemove)
            })
        })
    }

    const handleGroupClick = (idxToRemove) => {
        props.setSelectedEntryGroups((prevState) => {
            return prevState.filter((group, idx) => {
                return (idx !== idxToRemove)
            })
        })
    }
    
    return (
        <div className="tag-person-tables">
            <div className="tag-table">
                {props.selectedEntryTags.length > 0 && <Table.Head>
                    <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>Tags</Table.TextCell>
                </Table.Head>}
                <Table.Body>
                    {props.selectedEntryTags.map((tag, idx) => 
                        <Table.Row key={idx} isSelectable={true} onSelect={()=>handleTagClick(idx)}>
                            <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>
                                {tag.title}
                            </Table.TextCell>
                        </Table.Row>
                    )}
                </Table.Body>
            </div>
            <div className="person-table">
                {props.selectedEntryPeople.length > 0 && <Table.Head>
                    <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>People</Table.TextCell>
                </Table.Head>}
                <Table.Body>
                    {props.selectedEntryPeople.map((person, idx) => 
                        <Table.Row key={idx} isSelectable={true} onSelect={()=>handlePersonClick(idx)}>
                            <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>
                                {person.title}
                            </Table.TextCell>
                        </Table.Row>
                    )}
                </Table.Body>
            </div>
            <div className="group-table">
                {props.selectedEntryGroups.length > 0 && <Table.Head>
                    <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>Groups</Table.TextCell>
                </Table.Head>}
                <Table.Body>
                    {props.selectedEntryGroups.map((group, idx) => 
                        <Table.Row key={idx} isSelectable={true} onSelect={()=>handleGroupClick(idx)}>
                            <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>
                                {group.title}
                            </Table.TextCell>
                        </Table.Row>
                    )}
                </Table.Body>
            </div>
            
        </div>
    )
}

export default TagPersonTable