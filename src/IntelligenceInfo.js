import React from "react";
import { Link } from "react-router-dom";

//stateless functional component
function IntelligenceInfo() {
    // console.log("profile pic: ", props);
    return (
        <div className="intelligenceinfo">
            <h3 className="title-introduction">Raven's Progressive Matrices</h3>
            <p>
                Raven's Progressive Matrices (often referred to simply as
                Raven's Matrices) or RPM is a nonverbal group test typically
                used in educational settings. It is usually a 60-item test used
                in measuring abstract reasoning and regarded as a non-verbal
                estimate of fluid intelligence.[1] It is the most common and
                popular test administered to groups ranging from 5-year-olds to
                the elderly.[2] It is made of 60 multiple choice questions,
                listed in order of difficulty.[2] This format is designed to
                measure the test taker's reasoning ability, the eductive
                ("meaning-making") component of Spearman's g (g is often
                referred to as general intelligence). The tests were originally
                developed by John C. Raven in 1936.[3] In each test item, the
                subject is asked to identify the missing element that completes
                a pattern. Many patterns are presented in the form of a 6×6,
                4×4, 3×3, or 2×2 matrix, giving the test its name.
            </p>
        </div>
    );
}
export default IntelligenceInfo;
