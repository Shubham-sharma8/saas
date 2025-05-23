import { Footer } from "@/components/footer";
import SparklesPreview from "../../../../components/ui/sparks";

import React from "react";
import GoogleForm from "./(routes)/GoogleForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join-Us",
  description: "Unleash AI Creativity",
};

const helpPage: React.FC = () => {
  return (
    <div className="mt-12">
      {/* <LandingMiddle />    */}
      <SparklesPreview buttonText="Join Us" />

      <div>
        <div
          style={{
            textAlign: "left",
            marginLeft: "25%",
            marginRight: "25%",
            marginTop: "5vh",
          }}
        >
          <p style={{ textAlign: "center" }}>
            Write us at{" "}
            <a
              href="mailto:help@cogify.social?subject=I%20want%20to%20contact%20you."
              style={{ color: "#A020F0", fontWeight: "bold" }}
            >
              help@cogify.social
            </a>{" "}
            to connect with us.
          </p>

          <div
            className="flex justify-center"
            style={{ width: "100%", marginTop: "20px" }}
          >
            <Link
              href={
                "mailto:help@cogify.social?subject=I%20want%20to%20contact%20you."
              }
            >
              <Button className="px-8 py-2 rounded-md bg-zinc-800 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-blue-500">
                Contact Us
              </Button>
            </Link>
          </div>
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Or fill this form
          </p>
          <hr
            style={{
              borderColor: "black",
              borderWidth: "1px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
        </div>

        <GoogleForm />
      </div>

      <Footer />
    </div>
  );
};

export default helpPage;
