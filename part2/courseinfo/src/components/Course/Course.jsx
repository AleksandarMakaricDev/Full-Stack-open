const Header = ({ courseName }) => {
  return <h2>{courseName}</h2>;
};

const Part = ({ partName, partExercises }) => {
  return (
    <li>
      {partName} {partExercises}
    </li>
  );
};

const Content = ({ courseParts }) => {
  return (
    <ul>
      {courseParts.map(({ id, name, exercises }) => (
        <Part key={id} partName={name} partExercises={exercises} />
      ))}
    </ul>
  );
};

const Total = ({ courseParts }) => {
  const total = courseParts
    .map(({ exercises }) => exercises)
    .reduce((prev, curr) => prev + curr);

  return <p>Total number of exercises: {total}.</p>;
};

const Course = ({ course }) => {
  const { name, parts } = course;

  const renderCourseContent = () => {
    if (parts.length) {
      return (
        <>
          <Content courseParts={parts} />
          <Total courseParts={parts} />
        </>
      );
    }

    return <p>Course has no parts.</p>;
  };

  return (
    <section>
      <Header courseName={name} />
      {renderCourseContent()}
    </section>
  );
};

export default Course;
