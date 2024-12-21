"use client";

import {
  TreeView,
  Link
} from '@primer/react'

interface TreeNodeData {
  title: string;
  id: string;
  children?: TreeNodeData[];
};

interface TableOfContentsProps {
  data: TreeNodeData[];
  label: string;
  base_url: string;
};

const TableOfContents = ({ data, label, base_url }: TableOfContentsProps) => {
  const renderTreeNodes = (nodes: TreeNodeData[]) => {
    return nodes.map(node => (
      <TreeView.Item key={node.id} id={node.id}>
        <Link href={base_url+node.id}>{node.title}</Link>
        {node.children && node.children?.length > 0 && (
          <TreeView.SubTree>
            {renderTreeNodes(node.children)}
          </TreeView.SubTree>
        )}
      </TreeView.Item>
    ));
  };

  if (data) {
    return (
      <nav aria-label={label}>
        <TreeView aria-label={label}>
          {renderTreeNodes(data)}
        </TreeView>
      </nav>
    );
  }
  return (
    <>
    </> 
  );
};

export default TableOfContents;
