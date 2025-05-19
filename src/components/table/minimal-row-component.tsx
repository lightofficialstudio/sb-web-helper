import React from "react";

export function MinimalRow({ children, row, index }: {
    children: (props: { row: any; index: number }) => React.ReactNode;
    row?: any;
    index?: number;
}) {
    return (
        <tr className="border-b last:border-none">
            {children({ row, index })}
        </tr>
    );
}
