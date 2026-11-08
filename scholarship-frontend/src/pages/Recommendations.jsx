
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getRecommendations,
  getScholarships,
  getMyApplications
} from '../services/api';
import ScholarshipCard from '../components/ScholarshipCard';

function Recommendations() {
  const { studentId } = useParams();

  const [results, setResults] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadResults() {
      try {
        const [
          recommendationResponse,
          scholarshipResponse,
          applicationResponse
        ] = await Promise.all([
          getRecommendations(studentId),
          getScholarships(),
          getMyApplications(studentId)
        ]);

        setResults(recommendationResponse.data);
        setScholarships(scholarshipResponse.data);

        const ids = applicationResponse.data.map(
          application => String(application.scholarshipId)
        );

        setAppliedIds(ids);
      } catch (err) {
        setError('Unable to load recommendations.');
      } finally {
        setLoading(false);
      }
    }

    loadResults();
  }, [studentId]);

  if (loading) return <p className="loading">Checking scholarships...</p>;
  if (error) return <p className="error-message">{error}</p>;

  const eligibleResults = results.filter(
    item => item.eligibilityStatus === 'ELIGIBLE'
  );

  return (
    <section className="results-page">
      <div className="section-heading">
        <span>YOUR RESULTS</span>
        <h1>Scholarship Recommendations</h1>
        <p>Student ID: {studentId}</p>
      </div>

      {eligibleResults.length > 0 ? (
        <>
          <h2 className="results-count">
            {eligibleResults.length} Matching Scholarship(s) Found
          </h2>

          <div className="scholarship-grid">
            {eligibleResults.map(result => {
              const scholarship = scholarships.find(
                item => String(item.id) === String(result.scholarshipId)
              );

              if (!scholarship) return null;

              return (
                <ScholarshipCard
                  key={result.id}
                  scholarship={scholarship}
                  reason={result.reason}
                  studentId={studentId}
                  isAlreadyApplied={appliedIds.includes(
                    String(scholarship.id)
                  )}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <h2>No Matching Scholarships Found</h2>
          <p>No scholarships currently match your entered details.</p>
        </div>
      )}

      <Link to="/student-form" className="primary-btn">
        Try Again
      </Link>
    </section>
  );
}

export default Recommendations;
