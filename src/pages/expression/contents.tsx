import { TreeView, TreeNode } from '@carbon/react';
import { useRouter } from 'next/navigation';

interface TreeNodeData {
  title: string;
  id: string;
  children?: TreeNodeData[];
};

interface TableOfContentsProps {
  data: TreeNodeData[];
  label: string;
};

const TableOfContents = ({ data, label }: TableOfContentsProps) => {
    const router = useRouter();
    const handleRowClick = (link?: string) => {
        if (link) {
            router.push(link); // Navigate to the link
        }
    };


    const renderTreeNodes = (nodes: TreeNodeData[]) => {
        return nodes.map((node, index) => (
            <TreeNode
                key={index}
                label={node.title}
                onClick={() => handleRowClick(`#${node.id}`)}
            >
                {node.children && renderTreeNodes(node.children)}
            </TreeNode>
        ));
    };

    if (data) {
        return (
            <TreeView label={label}>
                {renderTreeNodes(data)}
            </TreeView>
        );
    }
    return (
        <>
        </>
    );
};

export default TableOfContents;