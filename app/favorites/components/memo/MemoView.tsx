import MemoInteractive from "./MemoInteractive";
import styles from "./memo.module.css";

type Props = {
  memoHtml?: string | null;
  rating?: number | null;
  tags?: string[] | null;
  photos?: { url: string; alt?: string }[];
};

export default function MemoView({ memoHtml, rating, tags, photos }: Props) {
  return (
    <div className={styles.memoContainer}>
    <MemoInteractive rating={rating} tags={tags} photos={photos} />

    <section className={styles.memoSection}>
        <h2 className={styles.sectionTitle}>メモ・感想</h2>

      {memoHtml ? (
        <div className={styles.memoContent} dangerouslySetInnerHTML={{ __html: memoHtml }} />
      ) : (
        <p className={styles.empty}>メモはありません</p>
      )}
    </section>
    </div>
);
}