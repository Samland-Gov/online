import Link from "next/link";

export function GraphTile({title, href, icon}: {title: string, href: string, icon: () => React.ReactNode}) {
    return (
        <div className="graph-tile-container">
            <Link href={href} className="graph-tile-link cds--tile cds--tile--clickable">
                <div className="graph-tile-content">
                    <span className="graph-tile-title">{title}</span>
                    {icon()}
                </div>
            </Link>
        </div>
    )
}

export function GraphTilesContainer({children}: {children: React.ReactNode}) {
    return (
        <div className="graph-tiles-container">
            {children}
        </div>
    )
}