import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <section>
        <Link to="/">Dashboard</Link>
        <Link to="posts">Posts</Link>
      </section>
    </nav>
  );
}
