package com.scootshare.base.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scootshare.base.entities.Rating;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long>{

}
