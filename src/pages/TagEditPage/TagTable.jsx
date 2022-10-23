import { Table } from 'evergreen-ui';
import React from 'react'


const TagTable = (props) => {

    const TABLE_WIDTH = 300;
    
    return (
        <div className="tag-table">
            {props.tagsArray.length > 0 && <Table.Head>
                <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>Tags</Table.TextCell>
            </Table.Head>}
            <Table.Body>
                {props.tagsArray.map((tag, idx) => 
                    <Table.Row key={idx} isSelectable={true} onSelect={()=>props.handleClick(idx)}>
                        <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>
                            {tag.title}
                        </Table.TextCell>
                    </Table.Row>
                )}
            </Table.Body>
        </div>
    )
}

export default TagTable