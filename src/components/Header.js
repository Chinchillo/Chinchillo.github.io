import React from "react";
import { Badge } from "react-bootstrap";

const Header = () => (
    <div className="page-header">
        <h1 className="display-6">
            Street Renamings in Poland{' '}<Badge pill variant="secondary">Beta</Badge>
        </h1>

        <p className="lead">
            since 2006
		</p>
    </div>
);
export default Header