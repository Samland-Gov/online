import { ClickableTile } from "@carbon/react";

export function GraphTile({title, href, icon}: {title: string, href: string, icon: () => React.ReactNode}) {
    return (
        <ClickableTile href={href}>
            <div className="graph-tile-content">
                <span className="graph-tile-title">{title}</span>
                {icon()}
            </div>
        </ClickableTile>
    )
}

export function GraphTilesContainer({children}: {children: React.ReactNode}) {
    return (
        <div className="graph-tiles-container">
            {children}
        </div>
    )
}