package com.scootshare.base.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scootshare.base.entities.Listing;
import com.scootshare.base.entities.Scooter;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long>{

	Listing findByScooter(Scooter scooter);

}
